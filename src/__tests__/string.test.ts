import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  truncate,
  trim,
  pad,
  randomString,
  template,
  escapeHtml,
  unescapeHtml,
  byteLength,
} from '../utils/string';

describe('String utilities', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('Hello');
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('h')).toBe('H');
      expect(capitalize('H')).toBe('H');
    });
  });

  describe('camelCase', () => {
    it('should convert to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('Hello_World')).toBe('helloWorld');
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('Hello-World_Test')).toBe('helloWorldTest');
    });

    it('should handle empty string', () => {
      expect(camelCase('')).toBe('');
    });

    it('should handle already camelCase', () => {
      expect(camelCase('helloWorld')).toBe('helloWorld');
    });
  });

  describe('kebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('HelloWorld')).toBe('hello-world');
      expect(kebabCase('hello_world')).toBe('hello-world');
      expect(kebabCase('hello world')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(kebabCase('')).toBe('');
    });

    it('should handle already kebab-case', () => {
      expect(kebabCase('hello-world')).toBe('hello-world');
    });
  });

  describe('snakeCase', () => {
    it('should convert to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('HelloWorld')).toBe('hello_world');
      expect(snakeCase('hello-world')).toBe('hello_world');
      expect(snakeCase('hello world')).toBe('hello_world');
    });

    it('should handle empty string', () => {
      expect(snakeCase('')).toBe('');
    });

    it('should handle already snake_case', () => {
      expect(snakeCase('hello_world')).toBe('hello_world');
    });
  });

  describe('pascalCase', () => {
    it('should convert to PascalCase', () => {
      expect(pascalCase('hello-world')).toBe('HelloWorld');
      expect(pascalCase('hello_world')).toBe('HelloWorld');
      expect(pascalCase('hello world')).toBe('HelloWorld');
      expect(pascalCase('helloWorld')).toBe('HelloWorld');
    });

    it('should handle empty string', () => {
      expect(pascalCase('')).toBe('');
    });

    it('should handle already PascalCase', () => {
      expect(pascalCase('HelloWorld')).toBe('HelloWorld');
    });
  });

  describe('truncate', () => {
    it('should truncate string with default suffix', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should truncate string with custom suffix', () => {
      expect(truncate('Hello World', 5, '---')).toBe('Hello---');
    });

    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    it('should handle zero length', () => {
      expect(truncate('Hello', 0)).toBe('...');
    });
  });

  describe('trim', () => {
    it('should trim default whitespace', () => {
      expect(trim('  hello  ')).toBe('hello');
      expect(trim('\t\nhello\t\n')).toBe('hello');
    });

    it('should trim custom characters', () => {
      expect(trim('---hello---', '-')).toBe('hello');
      expect(trim('xyzHelloxyz', 'xyz')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(trim('')).toBe('');
      expect(trim('', 'x')).toBe('');
    });
  });

  describe('pad', () => {
    it('should pad at start by default', () => {
      expect(pad('hello', 10)).toBe('     hello');
      expect(pad('hello', 10, '0')).toBe('00000hello');
    });

    it('should pad at end', () => {
      expect(pad('hello', 10, ' ', 'end')).toBe('hello     ');
      expect(pad('hello', 10, '0', 'end')).toBe('hello00000');
    });

    it('should pad both sides', () => {
      expect(pad('hello', 10, ' ', 'both')).toBe('  hello   ');
      expect(pad('hello', 11, '0', 'both')).toBe('000hello000');
    });

    it('should not pad if already long enough', () => {
      expect(pad('hello', 5)).toBe('hello');
      expect(pad('hello', 3)).toBe('hello');
    });
  });

  describe('randomString', () => {
    it('should generate random string of specified length', () => {
      const result = randomString(10);
      expect(result).toHaveLength(10);
      expect(typeof result).toBe('string');
    });

    it('should generate different strings', () => {
      const str1 = randomString(10);
      const str2 = randomString(10);
      expect(str1).not.toBe(str2);
    });

    it('should use custom character set', () => {
      const result = randomString(10, '123');
      expect(result).toMatch(/^[123]+$/);
    });

    it('should handle zero length', () => {
      expect(randomString(0)).toBe('');
    });
  });

  describe('template', () => {
    it('should replace template variables', () => {
      const templateStr = 'Hello {{name}}, you are {{age}} years old';
      const data = { name: 'John', age: 30 };
      expect(template(templateStr, data)).toBe(
        'Hello John, you are 30 years old'
      );
    });

    it('should handle missing variables', () => {
      const templateStr = 'Hello {{name}}, you are {{age}} years old';
      const data = { name: 'John' };
      expect(template(templateStr, data)).toBe(
        'Hello John, you are {{age}} years old'
      );
    });

    it('should handle empty data', () => {
      const templateStr = 'Hello {{name}}';
      expect(template(templateStr, {})).toBe('Hello {{name}}');
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML characters', () => {
      expect(escapeHtml('<div>Hello & "world"</div>')).toBe(
        '&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;'
      );
      expect(escapeHtml("It's a test")).toBe('It&#39;s a test');
    });

    it('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should handle string without HTML', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('unescapeHtml', () => {
    it('should unescape HTML entities', () => {
      expect(
        unescapeHtml('&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;')
      ).toBe('<div>Hello & "world"</div>');
      expect(unescapeHtml('It&#39;s a test')).toBe("It's a test");
    });

    it('should handle empty string', () => {
      expect(unescapeHtml('')).toBe('');
    });

    it('should handle string without entities', () => {
      expect(unescapeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('byteLength', () => {
    it('should calculate byte length for ASCII characters', () => {
      expect(byteLength('hello')).toBe(5);
    });

    it('should calculate byte length for Chinese characters', () => {
      expect(byteLength('你好')).toBe(6); // 中文字符UTF-8编码为3字节
    });

    it('should calculate byte length for mixed characters', () => {
      expect(byteLength('hello你好')).toBe(11); // 5 + 6
    });

    it('should handle empty string', () => {
      expect(byteLength('')).toBe(0);
    });
  });
});
