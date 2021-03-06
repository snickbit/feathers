import {PaginationOptions} from '@feathersjs/adapter-commons'
import {NotImplemented} from '@feathersjs/errors'
import {Id, NullableId, Paginated, ServiceMethods} from '@feathersjs/feathers'
import {AggregateOptions} from 'mongodb'
import MongoAdapter, {MongoServiceOptions} from './mongo.adapter'

export class InternalService<T = any, D = Partial<T>, P extends MongoServiceOptions = MongoServiceOptions> extends MongoAdapter implements ServiceMethods<Paginated<T> | T, D, P> {
	protected allowedMethods: string[] = []

	constructor(options) {
		const allowedMethods = []

		if (options.allowedMethods) {
			allowedMethods.push(...options.allowedMethods)
			delete options.allowedMethods
		}

		super(options)

		this.allowedMethods = allowedMethods
	}

	async aggregate(pipeline: any[], params: AggregateOptions = {}): Promise<any[]> {
		if (!this.allowedMethods.includes('aggregate')) {
			throw new NotImplemented('Method `aggregate` not implemented')
		}
		return super._aggregate(pipeline, params)
	}

	async find(params?: P & {paginate?: PaginationOptions}): Promise<Paginated<T>>
	async find(params?: P & {paginate: false}): Promise<T[]>
	async find(params?: P): Promise<Paginated<T> | T[]>
	async find(params?: P): Promise<Paginated<T> | T[]> {
		if (!this.allowedMethods.includes('find')) {
			throw new NotImplemented('Method `find` not implemented')
		}
		return super._find(params)
	}

	async get(id: Id, params?: P): Promise<T> {
		if (!this.allowedMethods.includes('get')) {
			throw new NotImplemented('Method `get` not implemented')
		}
		return super._get(id, params)
	}

	async create(data: Partial<D>, params?: P): Promise<T>
	async create(data: Partial<D>[], params?: P): Promise<T[]>
	async create(data: Partial<D> | Partial<D>[], params?: P): Promise<T | T[]> {
		if (!this.allowedMethods.includes('create')) {
			throw new NotImplemented('Method `create` not implemented')
		}
		return super._create(data, params)
	}

	async update(id: Id, data: D, params?: P): Promise<T> {
		if (!this.allowedMethods.includes('update')) {
			throw new NotImplemented('Method `update` not implemented')
		}
		return super._update(id, data, params)
	}

	async patch(id: Id, data: Partial<D>, params?: P): Promise<T>
	async patch(id: null, data: Partial<D>, params?: P): Promise<T[]>
	async patch(id: NullableId, data: Partial<D>, params?: P): Promise<T | T[]> {
		if (!this.allowedMethods.includes('patch')) {
			throw new NotImplemented('Method `patch` not implemented')
		}
		return super._patch(id, data, params)
	}

	async remove(id: Id, params?: P): Promise<T>
	async remove(id: null, params?: P): Promise<T[]>
	async remove(id: NullableId, params?: P): Promise<T | T[]> {
		if (!this.allowedMethods.includes('remove')) {
			throw new NotImplemented('Method `remove` not implemented')
		}
		return super._remove(id, params)
	}
}
