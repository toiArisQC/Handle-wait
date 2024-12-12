describe("Practice automation cypress", ()=> {
    let bodyData:object
    before(() => {
        // thực hiện duy nhất 1 lần
        bodyData = {
            value: [
              {
                "user": "operator2",
                "userId": 1
              },
              {
                "user": "maintainer2",
                "userId": 2
              },
              {
                "user": "engineer3",
                "userId": 3
              },
              {
                "user": "admin3",
                "userId": 4
              },
              {
                "user": "accretech3",
                "userId": 5
              }
            ]
          };
        
      });
      beforeEach(() => {
        cy.visit('https://www.nxg-dev.aws-acct-nxgs.services/', {
            auth: {
              username: '',
              password: '',
            },
          })
      })
/* 1. cy.wait() - Wait for a fixed amount of time
Description:
Use cy.wait() to pause the test for a fixed amount of time (not the best practice in automation, but sometimes necessary).
Recommendation: Only use it in cases that cannot be handled by other methods.
*/
    it("Waits for a fixed time", ()=> {  
        cy.wait(2000);// Chờ 2 giây  
    });

/*2. cy.wait() with Aliases - Wait for API requests
Description:
Wait for API requests or asynchronous actions to complete by using aliases.
Set aliases for network requests or events, then use cy.wait() to wait*/
    it(' Wait for API request to complete', () => {
    // Thực hiện intercept để thay đổi dữ liệu trả về từ API
    cy.intercept('GET', "https://cloud-accretech.link/acct/1/server/resource/100/auth/users", {
      statusCode:200,
      body:bodyData
    }).as('users');

    // Chờ API trả về dữ liệu đã được thay đổi
    cy.wait('@users').then((interception:any) => {
      const items = interception.response.body.value;  // Lấy dữ liệu đã thay đổi
      const apiUserNames = items.map((item:any) => item.user);  // Tạo mảng tên người dùng từ API
      });
    });

/*3. cy.get() with { timeout } - Wait for an element to appear in the DOM
Description:

Use cy.get() to wait for an element to appear with a custom timeout.
This is an efficient way to wait for an element to appear without waiting for a fixed time.*/
    it('cy.get() with timeout - Chờ phần tử xuất hiện trong DOM', () => {
        // Chờ 10 giây để phần tử xuất hiện
        cy.get("input[placeholder='Password']", { timeout: 10000 }).should('be.visible');
      });

/* 4. cy.intercept() - Wait for a network request with specific conditions
Description:
cy.intercept() can be used to intercept and wait for network requests before continuing with the test.
Combine it with cy.wait() to handle scenarios that require data from the server.*/

xit('Intercept and wait for network request', () => {
  cy.visit('your-page-url');
  
  // Bắt yêu cầu mạng
  cy.intercept('POST', '/api/submit').as('submitData');
  
  // Thực hiện hành động gửi dữ liệu
  cy.get('#submitButton').click();
  
  // Chờ yêu cầu POST hoàn tất
  cy.wait('@submitData').its('response.statusCode').should('eq', 200);
});

/*5. cy.contains() and cy.get() to assert after waiting
Description:
Wait for an element or text to appear in the DOM and then assert the condition.*/
  it('cy.contains() with timeout - Chờ văn bản xuất hiện', () => {
    cy.get("button").contains('LOGIN').should('be.visible');;  // Tìm nút chứa văn bản "LOGIN"
  });


      });


    



