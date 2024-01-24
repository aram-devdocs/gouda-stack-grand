import { OGM } from '@neo4j/graphql-ogm';
import { typeDefs, driver } from './apollo';

export const ogm = new OGM({ typeDefs, driver });

// Models
export const User = ogm.model('User');
