"use strict";

var _metadataMin = _interopRequireDefault(require("../metadata.min.json"));

var _PhoneNumber = _interopRequireDefault(require("./PhoneNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('PhoneNumber', function () {
  it('should create a phone number via a public constructor', function () {
    var phoneNumber = new _PhoneNumber["default"]('+78005553535', _metadataMin["default"]);
    phoneNumber.setExt('1234');
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.countryCallingCode.should.equal('7');
    phoneNumber.nationalNumber.should.equal('8005553535');
    phoneNumber.formatNational().should.equal('8 (800) 555-35-35 ext. 1234');
  });
  it('should validate constructor arguments (public constructor)', function () {
    expect(function () {
      return new _PhoneNumber["default"]();
    }).to["throw"]('argument is required');
    expect(function () {
      return new _PhoneNumber["default"](undefined, _metadataMin["default"]);
    }).to["throw"]('argument is required');
    expect(function () {
      return new _PhoneNumber["default"]('7', _metadataMin["default"]);
    }).to["throw"]('must consist of a "+"');
    expect(function () {
      return new _PhoneNumber["default"]('+7', _metadataMin["default"]);
    }).to["throw"]('too short');
    expect(function () {
      return new _PhoneNumber["default"]('+7800');
    }).to["throw"]('`metadata` argument not passed');
    expect(function () {
      return new _PhoneNumber["default"](1234567890);
    }).to["throw"]('must be a string');
    expect(function () {
      return new _PhoneNumber["default"]('+1', 1234567890);
    }).to["throw"]('must be a string');
  });
  it('should validate constructor arguments (private constructor)', function () {
    expect(function () {
      return new _PhoneNumber["default"](undefined, '800', _metadataMin["default"]);
    }).to["throw"]('First argument is required');
    expect(function () {
      return new _PhoneNumber["default"]('7', undefined, _metadataMin["default"]);
    }).to["throw"]('`nationalNumber` argument is required');
    expect(function () {
      return new _PhoneNumber["default"]('7', '8005553535');
    }).to["throw"]('`metadata` argument not passed');
  });
  it('should accept country code argument', function () {
    var phoneNumber = new _PhoneNumber["default"]('RU', '8005553535', _metadataMin["default"]);
    phoneNumber.countryCallingCode.should.equal('7');
    phoneNumber.country.should.equal('RU');
    phoneNumber.number.should.equal('+78005553535');
  });
  it('should format number with options', function () {
    var phoneNumber = new _PhoneNumber["default"]('7', '8005553535', _metadataMin["default"]);
    phoneNumber.ext = '123';
    phoneNumber.format('NATIONAL', {
      formatExtension: function formatExtension(number, extension) {
        return "".concat(number, " \u0434\u043E\u0431. ").concat(extension);
      }
    }).should.equal('8 (800) 555-35-35 доб. 123');
  });
  it('should compare phone numbers', function () {
    new _PhoneNumber["default"]('RU', '8005553535', _metadataMin["default"]).isEqual(new _PhoneNumber["default"]('RU', '8005553535', _metadataMin["default"])).should.equal(true);
    new _PhoneNumber["default"]('RU', '8005553535', _metadataMin["default"]).isEqual(new _PhoneNumber["default"]('7', '8005553535', _metadataMin["default"])).should.equal(true);
    new _PhoneNumber["default"]('RU', '8005553535', _metadataMin["default"]).isEqual(new _PhoneNumber["default"]('RU', '8005553536', _metadataMin["default"])).should.equal(false);
  });
  it('should tell if a number is non-geographic', function () {
    new _PhoneNumber["default"]('7', '8005553535', _metadataMin["default"]).isNonGeographic().should.equal(false);
    new _PhoneNumber["default"]('870', '773111632', _metadataMin["default"]).isNonGeographic().should.equal(true);
  });
  it('should allow setting extension', function () {
    var phoneNumber = new _PhoneNumber["default"]('1', '2133734253', _metadataMin["default"]);
    phoneNumber.setExt('1234');
    phoneNumber.ext.should.equal('1234');
    phoneNumber.formatNational().should.equal('(213) 373-4253 ext. 1234');
  });
  it('should return possible countries', function () {
    // "599": [
    //    "CW", //  "possible_lengths": [7, 8]
    //    "BQ" //  "possible_lengths": [7]
    // ]
    var phoneNumber = new _PhoneNumber["default"]('599', '123456', _metadataMin["default"]);
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.getPossibleCountries().should.deep.equal([]);
    phoneNumber = new _PhoneNumber["default"]('599', '1234567', _metadataMin["default"]);
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.getPossibleCountries().should.deep.equal(['CW', 'BQ']);
    phoneNumber = new _PhoneNumber["default"]('599', '12345678', _metadataMin["default"]);
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.getPossibleCountries().should.deep.equal(['CW']);
    phoneNumber = new _PhoneNumber["default"]('599', '123456789', _metadataMin["default"]);
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.getPossibleCountries().should.deep.equal([]);
  });
  it('should return possible countries in case of ambiguity', function () {
    var phoneNumber = new _PhoneNumber["default"]('1', '2223334444', _metadataMin["default"]);
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.getPossibleCountries().indexOf('US').should.equal(0);
    phoneNumber.getPossibleCountries().length.should.equal(25);
  }); // it('should return empty possible countries when no national number has been input', () => {
  // 	const phoneNumber = new PhoneNumber('1', '', metadata)
  // 	expect(phoneNumber.country).to.be.undefined
  // 	phoneNumber.getPossibleCountries().should.deep.equal([])
  // })

  it('should return empty possible countries when not enough national number digits have been input', function () {
    var phoneNumber = new _PhoneNumber["default"]('1', '222', _metadataMin["default"]);
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.getPossibleCountries().should.deep.equal([]);
  });
  it('should return possible countries in case of no ambiguity', function () {
    var phoneNumber = new _PhoneNumber["default"]('US', '2133734253', _metadataMin["default"]);
    phoneNumber.country.should.equal('US');
    phoneNumber.getPossibleCountries().should.deep.equal(['US']);
  });
  it('should return empty possible countries in case of an unknown calling code', function () {
    var phoneNumber = new _PhoneNumber["default"]('777', '123', _metadataMin["default"]);
    expect(phoneNumber.country).to.be.undefined;
    phoneNumber.getPossibleCountries().should.deep.equal([]);
  }); // it('should validate phone number length', () => {
  // 	const phoneNumber = new PhoneNumber('RU', '800', metadata)
  // 	expect(phoneNumber.validateLength()).to.equal('TOO_SHORT')
  //
  // 	const phoneNumberValid = new PhoneNumber('RU', '8005553535', metadata)
  // 	expect(phoneNumberValid.validateLength()).to.be.undefined
  // })
});
//# sourceMappingURL=PhoneNumber.test.js.map