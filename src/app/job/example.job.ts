import { printLog } from 'expresso-core'
import cron from 'node-cron'

export class ExampleJob {
  /**
   * Get Example Task
   */
  public static getTask(): cron.ScheduledTask {
    const cronExpression = '*/5 * * * *'

    // Run this job every 2:00 am
    const task = cron.schedule(cronExpression, async () => {
      const msgType = `Cron Job:`
      const message = 'Running task every 15 minutes'

      const logMessage = printLog(msgType, message)
      console.log(logMessage)
    })

    return task
  }
}
