var JSCheck, hash, verify, chai, expect, jsc;

JSCheck = require("../../jscheck/jscheck");

hash = require("../../../lib/security/hashing/hashing").hash;
verify = require("../../../lib/security/hashing/hashing").verify;

chai = require("chai");
expect = chai.expect;

jsc = JSCheck();

describe("Testing passwords", () => {
  it("10 random passwords follows the password rules", function (done) {
    function on_done(log) {
      try {
        expect(log.pass).to.eql(10);
        done();
      } catch (e) {
        console.log(fail);
        done(e);
      }
    }

    jsc.claim(
      "Login",
      async function predicate(verdict, a) {
        var hashed = hash(a);
        if (!hashed) return verdict(false);
        let result = verify(hashed.hash, a, hashed.salt);
        return verdict(result);
      },
      [
        jsc.string(
          2,
          jsc.character("A", "Z"),
          1,
          jsc.wun_of(["!", "@", "#", "$", "%"]),
          2,
          jsc.character("1", "9"),
          5,
          jsc.character("a", "z"),
          1,
          jsc.wun_of(["!", "@", "#", "$", "%"])
        ),
      ]
    );
    jsc.check({
      nr_trials: 10,
      detail: 3,
      on_result: on_done,
    });
  });
});
