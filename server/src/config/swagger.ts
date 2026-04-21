import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { 
      title: "WoodyToys API", 
      version: "1.0.0",
      description: "API sécurisée avec Basic, Digest et JWT"
    },
    components: {
      securitySchemes: {
        basicAuth: { type: "http", scheme: "basic" },
        digestAuth: { type: "http", scheme: "digest" },
        bearerAuth: { // INDISPENSABLE pour le bouton Authorize JWT
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
    },
    paths: {
      "/api/auth/login": {
        post: {
          summary: "Connexion (student / password123)",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    password: { type: "string" }
                  }
                }
              }
            }
          },
          responses: { "200": { description: "OK" } }
        }
      },
      "/api/profile": {
        get: {
          summary: "Accès au profil (JWT)",
          security: [{ bearerAuth: [] }],
          responses: { "200": { description: "OK" } }
        }
      },
      "/api/auth/refresh": {
        post: {
          summary: "Rafraîchir le token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    refreshToken: { 
                      type: "string", 
                      description: "Le Refresh Token récupéré depuis les cookies" 
                    }
                  }
                }
              }
            }
          },
          responses: { 
            "200": { description: "OK - Nouvel Access Token généré" },
            "401": { description: "Refresh Token manquant" },
            "403": { description: "Refresh Token invalide" }
          }
        }
      },
      // Garde tes anciennes routes admin ici aussi...
      "/api/admin/basic": { get: { summary: "Basic Auth", security: [{ basicAuth: [] }], responses: { "200": { description: "OK" } } } },
      "/api/admin/digest": { get: { summary: "Digest Auth", security: [{ digestAuth: [] }], responses: { "200": { description: "OK" } } } }
    }
  },
  apis: [], 
};

export const swaggerSpec = swaggerJsdoc(options);