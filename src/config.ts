export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  logSize: parseFloat(process.env.LOG_FILE_SIZE) * 1000 || 1000,
});
