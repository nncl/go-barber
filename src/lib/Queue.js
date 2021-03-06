import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({key, handle}) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Add job to queue
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  proccessQueue() {
    jobs.forEach(job => {
      const {bee, handle} = this.queues[job.key];

      bee.on('failed', this.handleError).process(handle);
    });
  }

  handleError(job, err) {
    console.error(`Job ${job.id} failed:`, err);
  }
}

export default new Queue();
