import { green } from 'colorette'
import cron from 'node-cron'
import { logger } from '~/config/pino'

export class ExampleJob {
  /**
   * Get Example Task
   */
  public static getTask(): cron.ScheduledTask {
    const cronExpression = '*/5 * * * *'

    // Run this job every 2:00 am
    const task = cron.schedule(cronExpression, async () => {
      const msgType = green(`cron job`)
      logger.info(`${msgType} - running task every 15 minutes`)
    })

    return task
  }
}
