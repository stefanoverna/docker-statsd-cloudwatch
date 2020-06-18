(function() {
  console.log(process.env);

  const redisUrl = process.env.REDIS_URL || 'redis://host.docker.internal:6379/0';

  return {
    port: parseInt(process.env.STATSD_PORT) || 8125,
    backends: ["./backends/console", "./backends/cloudwatch", "./backends/redis"],
    debug: process.env.STATSD_DEBUG == 'true',
    flushInterval: parseInt(process.env.STATSD_FLUSH_INTERVAL) || 60000,
    deleteIdleStats: true,
    cloudwatch: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'key_id',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'secret',
      region: process.env.AWS_REGION || 'EU_WEST_1',
      namespace: process.env.CLOUDWATCH_NAMESPACE,
      metricName: process.env.CLOUDWATCH_METRIC_NAME,
      processKeyForNamespace: process.env.CLOUDWATCH_PROCESS_KEY_FOR_NAMESPACE !== 'false',
      whitelist: process.env.CLOUDWATCH_WHITELIST || 'cda-response_time,rails-status_error,rails-status_success',
    },
    redisHash: {
      connectUrl: redisUrl,
      prefixWhitelist: process.env.REDIS_HASH_PREFIX_WHITELIST || 'cma_api_calls,cda_api_calls,cda_bandwidth,assets_bandwidth'
    },
    redisSortedSet: {
      connectUrl: redisUrl,
      prefixWhitelist: process.env.REDIS_SORTED_SET_PREFIX_WHITELIST || 'assets_referral,assets_ip,assets_path',
      keepTop: 100,
    }
  };
})()

