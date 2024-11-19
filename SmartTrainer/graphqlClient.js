import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Configurar el enlace HTTP para definir la URI y los headers
const link = new HttpLink({
    uri: 'https://zeunitz.us-east-a.ibm.stepzen.net/api/soft-sparrow/graphql',
    headers: {
        'Authorization':'apikey zeunitz::local.net+1000::68dec762284708c4efe81acd49b019adf97eb230699d4bb192392a6354047370',
    },
});

// Crear el cliente Apollo con caché y enlace HTTP
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(), // Gestión de caché
});

export default client;
