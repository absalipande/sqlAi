import openaiClient from '../utils/api';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';

const generate = async (queryDescription: string): Promise<string> => {
  const daVinci = async (queryDescription: string): Promise<string> => {
    const response = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: `Convert the following natural language description into a SQL query:\n\n${queryDescription}`,
      max_tokens: 100,
      temperature: 0,
    });
    return response.data.choices[0].text;
  };

  const chatGPT = async (queryDescription: string): Promise<string> => {
    const message: ChatCompletionRequestMessage[] = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `You are a translator from plain English to SQL.`,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `Convert the following natural language description into a SQL query:\n\nShow all all the elements in the table users`,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'SELECT * FROM users;',
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `Convert the following natural language description into a SQL query:\n\n${queryDescription}`,
      },
    ];
    const response = await openaiClient.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: message,
    });

    return response.data.choices[0].message.content;
  };

  const sqlQuery = await chatGPT(queryDescription);
  return sqlQuery;
};

export default generate;
