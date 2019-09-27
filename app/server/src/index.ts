import express from 'express';
import path from 'path';
import { config } from './../config'

import { indexController } from './controllers';

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../../public')))
app.use('/', indexController);

app.listen(config.port) 