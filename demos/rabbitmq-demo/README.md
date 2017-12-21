

# RabbitMQ demo

## 解决问题
- 幂等性
- 断线重连
- 消息消费稳定性
	- 持久化
	- 消息暂存
- 多线程
	- 多队列管理	
	- 多线程消费


## MQ
- topic模式下:
    - `ch.publish(ex, key, new Buffer(msg));` 中`key`为?
    - `ch.assertExchange(ex, 'topic', {durable: false});` 中`durable`持久化的内容?