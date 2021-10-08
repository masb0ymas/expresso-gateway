import 'module-alias/register'
import './pathAlias'

import dotenv from 'dotenv'
import App from './app'

dotenv.config()

const Server = new App()
Server.run()
