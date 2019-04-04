import formatRequest from "utils/config.service";

export default {
	login:formatRequest(["security","login","post"]),
	test:formatRequest(["security","test","get",true])
}