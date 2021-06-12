let JSCheck: any, jsc: any;
import chai from "chai";
let expect = chai.expect;

JSCheck = require("../../jscheck/jscheck");
import { Hash, Verify } from "../../../src";

jsc = JSCheck();

describe("Testing passwords", () => {
  it("10 random passwords follows the password rules", function (done) {
    function on_done(log: any) {
      console.log({ log });
      try {
        expect(log.pass).to.eql(10);
        done();
      } catch (e) {
        done(e);
      }
    }

    jsc.claim(
      "Login",
      async function predicate(verdict: Function, a: string) {
        var hashed = Hash(a);
        if (!hashed) return verdict(false);
        let result = Verify(hashed.hash, a, hashed.salt);
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
