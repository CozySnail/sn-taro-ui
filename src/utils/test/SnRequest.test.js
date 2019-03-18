/* eslint-env jest */
const expect = require('expect.js');
const SnRequest = require('../../../dist/h5/utils/network/SnRequest');

describe('测试 SnRequest 工具类', function () {

  describe('测试 postForm 方法', function () {

    it('默认无参情况', function () {
      expect(SnRequest.postForm()).to.be.ok();
    });
  });

});

