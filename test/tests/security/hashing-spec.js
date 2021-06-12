var chai, expect, hash, verify;

chai = require("chai");
expect = chai.expect;
hash = require("../../../lib/security/hashing/hashing").hash;
verify = require("../../../lib/security/hashing/hashing").verify;

describe("Hash & Verify", function () {
  it("disallows hash input less than three chars", (done) => {
    expect(hash("a")).to.equals(undefined);
    expect(hash("ab")).to.equals(undefined);
    done();
  });
  it("allows hash input three chars", (done) => {
    let result = hash("o65!8al3@WzB0");
    expect(result).to.not.be.undefined;
    done();
  });
  it("disallows verify input less than three chars", (done) => {
    var output = hash("o65!8al3@WzB0");
    expect(verify("", "a", output)).to.be.undefined;
    expect(verify("", "ab", output)).to.be.undefined;
    done();
  });
  it("verifies pass", (done) => {
    var pass = "o65!8al3@WzB0";
    let hashed = hash(pass);
    let verified = verify(hashed.hash, pass, hashed.salt);
    expect(verified).to.be.true;
    done();
  });
});
