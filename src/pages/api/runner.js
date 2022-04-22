import { exec, spawn } from 'child_process'
import { Readable } from 'stream'
import { usePrisma } from '@prismaClient'
const fs = require('fs-extra')

export default async function handler(req, res) {
  console.log(req?.body)
  const path = req?.body?.path
  const timestamp = Date.now()
  const { test, result, repo } = usePrisma()

  try {
    await fs.ensureFile(`results/${path}/${timestamp}.json`)
    console.log('created dir & file for results')
  } catch (err) {
    console.error(err)
  }
  
  let k6 = spawn('k6', [
    'run',
    '--out',
    `json=results/${path}/${timestamp}.json`,
    req?.body?.script
  ])

  const [onlyRepo, testFile] = path.split('/')

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

  const resultResponse = await result.create({
    data: {
      testId: testResponse.id
    }
  })
}