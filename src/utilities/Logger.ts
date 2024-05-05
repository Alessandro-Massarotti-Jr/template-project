/* eslint-disable no-console */

import * as fs from 'fs';

type LoggerData = {
  message: string;
};

class Logger {
  public info(data: LoggerData): void {
    this.writeLog(data.message, 'INFO');
    console.log(`\x1b[36m[INFO]\x1b[35m[${new Date().toISOString()}]\x1b[0m - ${data.message}`);
  }
  public error(data: LoggerData): void {
    this.writeLog(data.message, 'ERROR');
    console.log(`\x1b[31m[ERROR]\x1b[35m[${new Date().toISOString()}]\x1b[0m - ${data.message}`);
  }
  public warn(data: LoggerData): void {
    this.writeLog(data.message, 'WARN');
    console.log(`\x1b[33m[WARN]\x1b[35m[${new Date().toISOString()}]\x1b[0m - ${data.message}`);
  }
  public debug(data: LoggerData): void {
    this.writeLog(data.message, 'DEBUG');
    console.log(`\x1b[34m[DEBUG]\x1b[35m[${new Date().toISOString()}]\x1b[0m - ${data.message}`);
  }
  public http(data: LoggerData): void {
    this.writeLog(data.message, 'HTTP');
    console.log(`\x1b[32m[HTTP]\x1b[35m[${new Date().toISOString()}]\x1b[0m - ${data.message}`);
  }

  private async writeLog(message: string, level: string) {
    const logsDirectory = './logs';
    const filePath = `./logs/${level}-logs.log`;
    const log = `[${level}][${new Date().toISOString()}][${process.pid}] - ${message}`;
    try {
      await fs.promises.mkdir(logsDirectory, { recursive: true });
      const data = await fs.promises.readFile(filePath, 'utf8');
      const novoConteudo = `${data.trim()}\n${log}`;
      await fs.promises.writeFile(filePath, novoConteudo);
    } catch (error) {
      await fs.promises.writeFile(filePath, log);
    }
  }
}

const logger = new Logger();

export { logger };
