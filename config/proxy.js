//显示转发日志
const proxyWithLog = proxySetting => {
  const settingEntry = Object.entries(proxySetting);
  const results = settingEntry.map(val => ({
    [`/proxy${val[0]}`]: {
      changeOrigin: true,
      pathRewrite: { "^/proxy": "" },
      ...val[1],
      onProxyReq: () =>
        console.log(`[api/proxy] ${val[0]} => ${val[1].target}${val[0]}`)
    }
  }));

  return Object.assign.apply(null, results);
};

const proxySetting = {
  // "/security": {
  //   target: "http://192.168.1.111:8080"
	// }
	"/":{
		target: "http://localhost:3000"
	}
};

module.exports = proxyWithLog(proxySetting);
