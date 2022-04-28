import { exec, spawn } from 'child_process'
import { Readable } from 'stream'
import { usePrisma } from '@prismaClient'
import { getSession } from 'next-auth/react'
const fs = require('fs-extra')

export default async function handler(req, res) {
  const timestamp = Date.now()
  const { result } = usePrisma()
  const { path, testId, script } = JSON.parse(req?.body)
  const session = await getSession({ req })

  try {
    await fs.ensureFile(`results/${path}/${timestamp}.json`)
  } catch (err) {
    console.error(err)
  }
  
  let k6 = spawn('k6', [
    'run',
    '--out',
    `json=results/${path}/${timestamp}.json`,
    script
  ])

  const stream = new Readable({ read: () => {} })
  stream.pipe(res)

  k6.stdout.on('data', data => {
    stream.push(data.toString())
  })

  k6.stderr.on('data', data => {
    console.log(`stderr: ${data.toString()}`)
    stream.push(`stderr: ${data.toString()}`)
  })
  
  k6.on('exit', code => {
    exec(`cat results/${path}/${timestamp}.json`, (error, stdout, stderr) => {
      res.end(`child process exited with code ${code.toString()}`)
    })
  })
  console.log(session?.user)

  const response = await result.create({
    data: {
      testId: testId,
      data: {},
      userId: parseInt(session?.user?.id)
    }
  })
  console.log(response)
}