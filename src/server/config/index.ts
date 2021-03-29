// config index used to set up mysql user connection and hide private info
export default require(`./${process.env.NODE_ENV}`).default

