import { expect, assert } from 'chai';

import utils from '../src/utils';

describe('Utils', () => {
    describe('isArray', () => {
        it('should return true when an array is passed in', () => {
            expect(utils.isArray([1, 2, 3])).to.be.true;
        });

        it('should return false when null is passed in', () => {
            expect(utils.isArray(null)).to.be.false;
        });

        it('should return false when an object is passed in', () => {
            expect(utils.isArray({a: 1, b: 2})).to.be.false;
        });
    });

    describe('isFunction', () => {
        it('should return true when a function is passed in', () => {
            expect(utils.isFunction(() => {
            })).to.be.true;
        });

        it('should return false when null is passed in', () => {
            expect(utils.isFunction(null)).to.be.false;
        });

        it('should return false when an object is passed in', () => {
            expect(utils.isFunction({a: 1, b: 2})).to.be.false;
        });
    });

    describe('isAsyncFunction', () => {
        it('should return true when an async function is passed in', () => {
            expect(utils.isAsyncFunction(async () => {
            })).to.be.true;
        });

        it('should return false when a normal function is passed in', () => {
            expect(utils.isAsyncFunction(() => {
            })).to.be.false;
        });

        it('should return false when null is passed in', () => {
            expect(utils.isAsyncFunction(null)).to.be.false;
        });

        it('should return false when an object is passed in', () => {
            expect(utils.isAsyncFunction({a: 1, b: 2})).to.be.false;
        });
    });

    describe('sleep', () => {
        it('should pause the execution for the given number of seconds', async () => {
            const start = new Date();
            await utils.sleep(1);
            const end = new Date();
            expect(end.getTime() - start.getTime()).to.be.gte(1000);
        });
    });

    describe('clone', () => {
        it('should deep clone an object', () => {
            const obj = {a: 1, b: {c: 2}};
            const cloneObj = utils.clone(obj);
            expect(cloneObj).to.deep.equal(obj);
            expect(cloneObj).to.not.equal(obj);
        });
    });

    describe('objectPurge', function () {
        it('should return the object with null, empty string and empty array fields removed by default', function () {
            const obj = {
                a: null,
                b: 1,
                c: '',
                d: [1, 2],
                e: [],
                f: {g: null, h: '', i: [1]},
            };
            const purgedObj = utils.objectPurge(obj);
            assert.deepEqual(purgedObj, {b: 1, d: [1, 2], f: {i: [1]}});
        });

        it('should also remove fields with only whitespace when strict is true', function () {
            const obj = {
                a: null,
                b: 1,
                c: '    ',
                d: [1, 2],
                e: [],
                f: {g: null, h: '   \t\n ', i: [1]},
            };
            const purgedObj = utils.objectPurge(obj, true);
            assert.deepEqual(purgedObj, {b: 1, d: [1, 2], f: {i: [1]}});
        });

        it('should return an empty object if all fields are null, empty string, empty array or whitespace', function () {
            const obj = {
                a: null,
                b: '',
                c: '    ',
                d: [],
            };
            const purgedObj = utils.objectPurge(obj, true);
            assert.deepEqual(purgedObj, {});
        });
    });

    describe("objectMerge", () => {
        it("should merge the properties from the source to the destination object", () => {
            const dest = {foo: "bar", age: 20};
            const src = {age: 30, name: "Alice"};

            utils.objectMerge(dest, src);

            expect(dest).to.deep.equal({foo: "bar", age: 30, name: "Alice"});
        });

        it("should only merge specified properties from the source object to the destination object", () => {
            const dest = {foo: "bar", age: 20};
            const src = {age: 30, name: "Alice"};

            utils.objectMerge(dest, src, ["age"]);

            expect(dest).to.deep.equal({foo: "bar", age: 30});
        });

        it("should throw an error when the source object is null", () => {
            const dest = {};
            const src = null;
            const props = null;
            expect(() => utils.objectMerge(dest, src, props)).to.throw("The source object cannot be null.");
        });

        it("should throw an error when a specified property is not found in the source object", () => {
            const dest = {};
            const src = { a: 1, b: 2 };
            const props = ["a", "c"];
            expect(() => utils.objectMerge(dest, src, props)).to.throw("The properties c is not found in source object.");
        });

    });
});