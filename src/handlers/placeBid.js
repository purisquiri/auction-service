import AWS from "aws-sdk";
import createError from "http-errors";
import validator from "@middy/validator";
import commonMiddleware from "../lib/commonMiddleware";
import { getAuctionById } from "./getAuction";
import placeBidSchema from "../lib/schemas/placeBidSchema";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const { id } = event.pathParameters;
  const { amount } = event.body;
  const { email } = event.requestContext.authorizer;

  const auction = await getAuctionById(id);

  //Bid identity validation
  if (auction.seller === email) {
    throw new createError.Forbidden("You can't bid in your own auction ");
  }

  //Avoid double biding
  if (email === auction.highestBid.bidder) {
    throw new createError.Forbidden("You are already the highest bidder");
  }

  //auction status validation
  if (auction.status !== "OPEN") {
    throw new createError.Forbidden("You cannot bid on closed auctions!");
  }

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `Your bid must be higher than ${auction.highestBid.amount}!`
    );
  }
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression:
      "set highestBid.amount = :amount, highestBid.bidder = :bidder",
    ExpressionAttributeValues: {
      ":amount": amount,
      ":bidder": email,
    },
    ReturnValues: "ALL_NEW",
  };

  let updatedAuction;

  try {
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid).use(
  validator({ inputSchema: placeBidSchema })
);
