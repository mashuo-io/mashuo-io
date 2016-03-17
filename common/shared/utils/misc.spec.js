import {displayBytes, displayDuration} from './misc';
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
	});

	it ('display duration', ()=>{
		expect(displayDuration(0.3)).to.eql('马上');
		expect(displayDuration(3)).to.eql('3秒');
		expect(displayDuration(45)).to.eql('1分钟');
		expect(displayDuration(123)).to.eql('2分钟');
		expect(displayDuration(60*28)).to.eql('28分钟');
		expect(displayDuration(60*60*0.6)).to.eql('1小时');
		expect(displayDuration(60*60*10)).to.eql('10小时');
		expect(displayDuration(60*60*26)).to.eql('26小时');
	});
});