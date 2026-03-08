## System Architecture


                    +----------------------+
                    |        Client        |
                    |  Web / Mobile / API  |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      API Gateway     |
                    |  (Auth / Routing)    |
                    +----------+-----------+
                               |
                               v
          ----------------------------------------------
          |              |                 |          |
          v              v                 v          v
    +-----------+  +----------------+ +----------+ +-------------+
    | Flight    |  | Booking/Search | | Payment  | | Notification|
    | Service   |  | Service        | | Service  | | Service     |
    +-----------+ +-----------------+ +-----------+ +------------+
          |                 |             |
          v                 v             v
    +-----------+     +------------+   +-----------+
    | Flight DB |     | Booking DB |   | Payment DB|
    +-----------+     +------------+   +-----------+
                             |
                             v
                 +----------------------------+
                 |      Event Streaming       |
                 |      Apache Kafka          |
                 +-----------------------------+
                   |          |              |
                   v          v              v
          +-------------+ +-------------+ +-------------+
          | Ticketing   | | Notification| | Airline IT  |
          | Service     | | Service     | | Integration |
          +-------------+ +-------------+ +-------------+


## Booking Flow

```mermaid
User Search
     ↓
Search Service
     ↓
Flight Selected
     ↓
Seat Locked
     ↓
Booking Created
     ↓
Payment
     ↓
Ticket Issued
```

## Kafka Setup

https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Foundations-of-Event-Streaming/Demo-Setting-up-Kafka-Cluster-and-Kafka-UI-using-Docker/page?utm_source=google&utm_medium=cpc&utm_campaign=KK_PMAX_IN_B2C-Cloud_Acquisition_CONV_NAN_PROS_MULT_NA_TB_Purchase&utm_term=&utm_content=&hsa_dev=c&hsa_place=&utm_term=&utm_campaign=KK_PMAX_IN_B2C-Cloud_Acquisition_CONV_NAN_PROS_MULT_NA_TB_(Purchase&utm_source=adwords&utm_medium=ppc&hsa_acc=8039903603&hsa_cam=22618928378&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=2&gad_campaignid=22612600059&gclid=CjwKCAiAtq_NBhA_EiwA78nNWB8gp1rIAQMshLgQAqR8K5qKWwPKSwZcKUhp-OVb9qfI5-DSfQdQZhoCgDgQAvD_BwE

docker network create kafka-net

docker run --rm -d \
  --network kafka-net \
  -p 2181:2181 \
  -p 3030:3030 \
  -p 9092:9092 \
  -p 8081:8081 \
  -p 8082:8082 \
  -e ADV_HOST=kafka-cluster \
  --name kafka-cluster \
  lensesio/fast-data-dev

docker run --rm -d \
  --network kafka-net \
  -p 8080:8080 \
  -e DYNAMIC_CONFIG_ENABLED=true \
  --name kafka-ui \
  provectuslabs/kafka-ui



## Miscellaneous

Start Mysql: brew services start mysql