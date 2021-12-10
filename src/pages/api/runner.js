import { exec, spawn } from 'child_process'
import { Readable } from 'stream'

export default async function handler(req, res) {
  const path = req?.body?.path
  let options
  
  let k6 = spawn('k6', [
    'run',
    '--out',
    'json=results/latest.json',
    req?.body?.script
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
    exec('cat results/latest.json', (error, stdout, stderr) => {
      res.end(`child process exited with code ${code.toString()}`)
    })
  })
}