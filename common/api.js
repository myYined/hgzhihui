import request from '@/common/request.js'


export const SetLogin = (data)=>{
	return request.post('/api/AppControl/SetLogin',data)
}
export const GetClassroomList = (data,s)=>{
	console.log("s",s);
	return request.post('/api/AppControl/GetClassroomList',data,s)
}
export const GetGatewayDevicesList = (data)=>{
	return request.post('/api/AppControl/GetGatewayDevicesList',data)
}
export const GetGatewayList = (data)=>{
	return request.post('/api/AppControl/GetGatewayList',data)
}
export const SetGatewayDeviceControl = (data)=>{
	return request.post('/api/AppControl/SetGatewayDeviceControl',data)
}

export const GetQueryCriteria = (data)=>{
	return request.post('/api/AppControl/GetQueryCriteria',data)
}
export const SetAllGatewayDeviceControl = (data)=>{
	return request.post('/api/AppControl/SetAllGatewayDeviceControl',data)
}


