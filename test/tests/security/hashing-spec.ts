import chai from "chai";
import { Hash, Verify } from "../../../src";
let expect = chai.expect;

describe("Hash & Verify", function () {
  it("disallows hash input less than three chars", (done) => {
    expect(Hash("a")).to.equals(undefined);
    expect(Hash("ab")).to.equals(undefined);
    done();
  });
  it("allows hash input three chars", (done) => {
    let result = Hash("o65!8al3@WzB0");
    expect(result).to.not.be.undefined;
    done();
  });
  it("disallows verify input less than three chars", (done) => {
    let output = Hash("o65!8al3@WzB0");
    expect(Verify(output.hash, "a", output.salt)).to.be.undefined;
    expect(Verify(output.hash, "ab", output.salt)).to.be.undefined;
    done();
  });
  it("verifies pass", (done) => {
    var pass = "o65!8al3@WzB0";
    let hashed = Hash(pass);
    let verified = Verify(hashed.hash, pass, hashed.salt);
    expect(verified).to.be.true;
    done();
  });
});
