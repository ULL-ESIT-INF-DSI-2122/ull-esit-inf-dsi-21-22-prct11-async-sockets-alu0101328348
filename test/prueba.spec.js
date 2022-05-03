"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const prueba_1 = require("../src/prueba");
describe('add function tests', () => {
    it('add(1, 8) returns value 9', () => {
        (0, chai_1.expect)((0, prueba_1.add)(1, 8)).to.be.equal(9);
    });
    it('add(-1, 8) returns value 7', () => {
        (0, chai_1.expect)((0, prueba_1.add)(-1, 8)).to.be.equal(7);
    });
    it('add(1.2, 3.5) returns value 4.7', () => {
        (0, chai_1.expect)((0, prueba_1.add)(1.2, 3.5)).to.be.equal(4.7);
    });
});
