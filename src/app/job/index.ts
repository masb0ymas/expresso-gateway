import { ExampleJob } from './example.job'

export class Jobs {
  /**
   * Initialize Jobs
   */
  public static initialize(): void {
    // run upload task
    this._exampleTask()
  }

  /**
   * Upload Task
   */
  private static _exampleTask(): void {
    // Upload Job
    const getTask = ExampleJob.getTask()
    getTask.start()
  }
}
