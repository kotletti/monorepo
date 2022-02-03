export type KafkaPayload<T = any> = {
  magicByte: number;
  attributes: number;
  timestamp: string;
  offset: string;
  key: string;
  value: T;
  headers: {
    kafka_correlationId: string;
    kafka_replyTopic: string;
    kafka_replyPartition: string;
  };
  isControlRecord: boolean;
  batchContext: {
    firstOffset: string;
    firstTimestamp: string;
    partitionLeaderEpoch: number;
    inTransaction: boolean;
    isControlBatch: boolean;
    lastOffsetDelta: number;
    producerId: string;
    producerEpoch: number;
    firstSequence: number;
    maxTimestamp: string;
    timestampType: number;
    magicByte: number;
  };
  topic: string;
  partition: number;
};
