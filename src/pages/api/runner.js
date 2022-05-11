import { usePrisma } from '@prismaClient'
import { getSession } from 'next-auth/react'
import { execa } from 'execa'
const fs = require('fs-extra')

export default async function handler(req, res) {
  const timestamp = Date.now()
  const { result } = usePrisma()
  const { path, testId, script } = req?.body
  const session = await getSession({ req })

  try {
    await fs.ensureFile(`results/${path}/${timestamp}.txt`)
  } catch (err) {
    console.error(err)
  }

  const subprocess = execa('k6', [
    'run',
    script
  ])
  subprocess.stdout.pipe(fs.createWriteStream(`results/${path}/${timestamp}.txt`))

  subprocess.on('exit', async code => {
    try {
      console.log(`finding results/${path}/${timestamp}.txt`)
      const output = await fs.readFileSync(`results/${path}/${timestamp}.txt`, 'utf8')
      const updated = await result.update({
        where: {
          id: response.id
        },
        data: {
          data: output
        }
      })
      console.log(updated)
    } catch (err) {
      console.error(err)
    }
  })
  
  const response = await result.create({
    data: {
      testId: testId,
      ghLogin: session?.user?.login
    }
  })

  res.status(200).json({
    message: 'done'
  })
}
