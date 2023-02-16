import { expect } from 'chai';
import stringUtils from '../src/StringUtils';

describe('StringUtil', () => {
    describe('isString', () => {
        it('should return true when the input is a string', () => {
            expect(stringUtils.isString('hello')).to.be.true;
        });

        it('should return false when the input is not a string', () => {
            expect(stringUtils.isString(123)).to.be.false;
            expect(stringUtils.isString(null)).to.be.false;
            expect(stringUtils.isString(undefined)).to.be.false;
            expect(stringUtils.isString({})).to.be.false;
        });
    });

    describe('isEmpty', () => {
        it('should return true when the input is null', () => {
            expect(stringUtils.isEmpty(null)).to.be.true;
            expect(stringUtils.isEmpty(undefined)).to.be.true;
        });

        it('should return true when the input is an empty string', () => {
            expect(stringUtils.isEmpty('')).to.be.true;
            expect(stringUtils.isEmpty('   ', true)).to.be.true;
        });

        it('should return true when the input is null', () => {
            expect(stringUtils.isEmpty(null)).to.be.true;
            expect(stringUtils.isEmpty(undefined)).to.be.true;
        });

        it('should return false when the input is not a string', () => {
            expect(stringUtils.isEmpty(123)).to.be.false;
            expect(stringUtils.isEmpty({})).to.be.false;
        });

        it('should return false when the input is a non-empty string', () => {
            expect(stringUtils.isEmpty('hello')).to.be.false;
            expect(stringUtils.isEmpty(' hello  ', true)).to.be.false;
        });

        it('should return false when the input is a space string where strict is false', () => {
            expect(stringUtils.isEmpty('   ', false)).to.be.false;
        });
    });

    describe('escapeHtml', () => {
        it('should escape all html entities', () => {
            expect(stringUtils.escapeHtml('<script>alert("Hello");</script>')).to.equal(
                '&lt;script&gt;alert(&quot;Hello&quot;);&lt;/script&gt;'
            );
        });

        it('should escape only necessary html entities', () => {
            expect(stringUtils.escapeHtml('Hello & "World"')).to.equal('Hello &amp; &quot;World&quot;');
        });

        it('should return empty string when the input is null', () => {
            expect(stringUtils.escapeHtml(null)).to.equal('');
        });
    });
});
