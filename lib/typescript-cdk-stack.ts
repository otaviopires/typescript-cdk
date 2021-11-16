import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
// import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import { Tags } from '@aws-cdk/core';
import { Networking } from './networking';

export class TypescriptCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const bucket = new Bucket(this, 'DocumentsBucket', {
      encryption: BucketEncryption.S3_MANAGED,
    });

    new cdk.CfnOutput(this, 'DocumentsBucketNameExport', {
      value: bucket.bucketName,
      exportName: 'DocumentsBucketName',
    });

    const networkingStack = new Networking(this, 'NetworkingConstruct', {
      maxAzs: 2,
    });

    Tags.of(networkingStack).add('Module', 'Networking');
    // example resource
    // const queue = new sqs.Queue(this, 'TypescriptCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
