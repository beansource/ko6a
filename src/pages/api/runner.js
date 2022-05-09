import { usePrisma } from '@prismaClient'
import { getSession } from 'next-auth/react'
import { execa } from 'execa'
const fs = require('fs-extra')

export default async function handler(req, res) {
  const timestamp = Date.now()
  const { result } = usePrisma()
  const { path, testId, script } = req?.body
  const session = await getSession({ req })

  const subprocess = execa('k6', [
    'run',
    script
  ])
  subprocess.stdout.pipe(fs.createWriteStream(`results/${path}/${timestamp}.txt`))

  res.status(200).json({
    message: `done`
  })

  subprocess.on('exit', code => {
    console.log('exit code ', code)
  })
  
  // let k6 = spawn('k6', [
  //   'run',
  //   '--out',
  //   `json=results/${path}/${timestamp}.json`,
  //   script
  // ])

  // const stream = new Readable({ read: () => {} })
  // stream.pipe(res)

  // k6.stdout.on('data', data => {
  //   stream.push(data.toString())
  // })

  // k6.stderr.on('data', data => {
  //   console.log(`stderr: ${data.toString()}`)
  //   stream.push(`stderr: ${data.toString()}`)
  // })

  const response = await result.create({
    data: {
      testId: testId,
      data: await fetch(`./results/${path}/${timestamp}.txt`).then(file => file.text()),
      ghLogin: session?.user?.login
    }
  })
  console.log(response)
}