fn main() {
    prost_build::compile_protos(&["ipld/dag_pb.proto"], &["."]).unwrap();
}