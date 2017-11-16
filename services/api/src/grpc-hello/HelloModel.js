var path = require('path');
var grpc = require('grpc');

const PROTO_PATH = path.resolve(__dirname, '../../protos/hello.proto');
const proto = grpc.load(PROTO_PATH).hello;


module.exports = () => {




}

