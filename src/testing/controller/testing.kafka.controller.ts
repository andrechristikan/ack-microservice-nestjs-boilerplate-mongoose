import { Controller } from '@nestjs/common';
import { ENUM_KAFKA_TOPICS } from 'src/kafka/kafka.constant';
import { MessageTopic, MessageValue } from 'src/kafka/kafka.decorator';
import { ENUM_LOGGER_ACTION } from 'src/logger/logger.constant';
import { Logger } from 'src/logger/logger.decorator';
import { IResponse } from 'src/utils/response/response.interface';
import { TestingDto } from '../dto/testing.dto';

@Controller()
export class TestingKafkaController {
    @Logger(ENUM_LOGGER_ACTION.TEST, { tags: ['helloKafka'] })
    @MessageTopic(ENUM_KAFKA_TOPICS.ACK_SUCCESS)
    async helloKafka(
        @MessageValue() value: Record<string, any>
    ): Promise<IResponse> {
        return value;
    }

    @Logger(ENUM_LOGGER_ACTION.TEST, { tags: ['helloKafkaError'] })
    @MessageTopic(ENUM_KAFKA_TOPICS.ACK_ERROR)
    async errorKafka(@MessageValue() value: TestingDto): Promise<IResponse> {
        return value;
    }
}
