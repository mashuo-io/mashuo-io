import {expect} from 'chai';
import reducer from './comments.reducer';
import * as actions from './comments.action';
import {testReducer} from '../../shared/utils/tools.spec';

let updatedOn = new Date;

let cases = [
	{
		before: undefined,
		action: actions.commentsLoaded({
			refType:'course', refId: '01', comments: [
				{
					_id: 'a', comment: 'good', updatedOn,
					user: {
						github: {avatarUrl: 'http://a.jpg', login: 'userA'}
					}
				},
				{
					_id: 'b', comment: 'better', updatedOn,
					user: {
						github: {avatarUrl: 'http://b.jpg', login: 'userB'}
					}
				}
		]}),
		after: {
			['course/01']: {
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA',  updatedOn},
					{_id: 'b', comment: 'better', avatarUrl:'http://b.jpg', author:'userB',  updatedOn}
				]
			}
		}
	},
	{
		before: {['course/02']: {comments: []}},
		action: actions.commentsLoaded({
			refType:'course', refId: '01', comments: [
				{
					_id: 'a', comment: 'good',  updatedOn,
					user: {
						github: {avatarUrl: 'http://a.jpg', login: 'userA'}
					}
				}
			]}),
		after: {
			['course/02']: {comments: []},
			['course/01']: {
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA',  updatedOn}
				]
			}
		}
	},
	{
		before: {
			['course/01']: {
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn}
				]
			}
		},
		action: actions.commentAdded({
			refType:'course', refId: '01', _id:'c', comment: 'best', updatedOn, user: {
				github: {avatarUrl: 'http://c.jpg', login: 'userC'}
			}
		}),
		after: {
			['course/01']: {
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn},
					{_id: 'c', comment: 'best', avatarUrl:'http://c.jpg', author:'userC', updatedOn}
				]
			}
		}
	},
	{
		before: {
			['course/01']: {
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn},
					{_id: 'b', comment: 'better', avatarUrl:'http://b.jpg', author:'userB', updatedOn}
				]
			}
		},
		action: actions.toggleReplyForm({ refType:'course', refId: '01', _id:'a' }),
		after: {
			['course/01']: {
				active: 'a',
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn},
					{_id: 'b', comment: 'better', avatarUrl:'http://b.jpg', author:'userB', updatedOn}
				]
			}
		}
	},
	{
		before: {
			['course/01']: {
				active: 'a',
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn},
					{_id: 'b', comment: 'better', avatarUrl:'http://b.jpg', author:'userB', updatedOn}
				]
			}
		},
		action: actions.toggleReplyForm({ refType:'course', refId: '01', _id:'a' }),
		after: {
			['course/01']: {
				active: null,
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn},
					{_id: 'b', comment: 'better', avatarUrl:'http://b.jpg', author:'userB', updatedOn}
				]
			}
		}
	},
	{
		before: {
			['course/01']: {
				active: 'a',
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn},
					{_id: 'b', comment: 'better', avatarUrl:'http://b.jpg', author:'userB', updatedOn}
				]
			}
		},
		action: actions.toggleReplyForm({ refType:'course', refId: '01', _id:'b' }),
		after: {
			['course/01']: {
				active: 'b',
				comments: [
					{_id: 'a', comment: 'good', avatarUrl:'http://a.jpg', author:'userA', updatedOn},
					{_id: 'b', comment: 'better', avatarUrl:'http://b.jpg', author:'userB', updatedOn}
				]
			}
		}
	}
];

describe('comments', ()=>{
	it('test reducer', () => {
		testReducer(reducer, cases);
	});
});