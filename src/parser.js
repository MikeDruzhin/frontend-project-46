import yaml from 'js-yaml';

const getParsedData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml' || 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default getParsedData;
