import {displayBytes} from './misc';
import {expect} from 'chai';

describe('misc', ()=>{
	it ('display bytes', ()=>{
		expect(displayBytes(90)).to.eql('90B');
		expect(displayBytes(512)).to.eql('512B');
		expect(displayBytes(513)).to.eql('1K');
		expect(displayBytes(1025)).to.eql('1K');
		expect(displayBytes(2043)).to.eql('2K');
		expect(displayBytes(1024*1024 + 1)).to.eql('1M');
		expect(displayBytes(1024*1024 * 2 - 1)).to.eql('2M');
		expect(displayBytes(1024*1024*1024 * 2 - 1)).to.eql('2G');
		expect(displayBytes(1024*1024*1024 + 1)).to.eql('1G');
	})
});