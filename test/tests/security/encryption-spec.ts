import chai from "chai";
import { Encrypt, Decrypt } from "../../../src";
let expect = chai.expect;
let text2encrypt: string, encryptedText: string;

describe("Encrypt & Decrypt", function () {
  before(() => {
    text2encrypt = "Chancellor on brink of second bailout for banks";
    encryptedText = "";
  });
  it("encrypts successfully", (done) => {
    encryptedText = Encrypt(text2encrypt);
    expect(encryptedText.length).to.equal(129);
    done();
  });
  it("decrypts successfully", (done) => {
    let result = Decrypt(encryptedText);
    expect(result).to.equal(text2encrypt);
    done();
  });
});
