import { DEFAULT_HEADER } from "../fixtures/defaultRequestHeader";

describe('getExercise', () => {
    it('should return status 200 for a valid request', () => {
      cy.request({
        method: 'GET',
        url: '/exercise',
        body: {
          userId: 'b929bd8f-2945-4a91-a8fe-b489e90ceecb',
        },
        headers: DEFAULT_HEADER,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it('should return the exercises with valid properties', () => {
      cy.request({
        method: 'GET',
        url: '/exercise',
        body: {
          userId: 'b929bd8f-2945-4a91-a8fe-b489e90ceecb',
        },
        headers: DEFAULT_HEADER,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body[0]).to.have.property('exerciseId')
        expect(response.body[0]).to.have.property('userId')
        expect(response.body[0]).to.have.property('name')
        expect(response.body[0]).to.have.property('weight')
        expect(response.body[0]).to.have.property('repetitions')
        expect(response.body[0]).to.have.property('breakTime')
        expect(response.body[0]).to.have.property('createdAt')
        expect(response.body[0]).to.have.property('updatedAt')
        expect(response.body[0]).to.have.property('recordId')
      });
    });

    it('should return an error for an invalid auth request', () => {
      cy.request({
        method: 'GET',
        url: '/exercise',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Invalid auth params');
      });
    });
   
    it('should return an unauthorized if the user does not exist', () => {
      cy.request({
        method: 'GET',
        url: '/exercise',
        body: {
          userId: 'c9d4d79f-8029-42ce-9187-914ce8462f27',
        },
        headers: DEFAULT_HEADER,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.equal('User does not exist!');
      });
    });
  });
  