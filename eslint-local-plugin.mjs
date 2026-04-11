const onlyTailwindRule = {
  meta: {
    type: 'problem',
    docs: {
      description: '在vue文件中禁止非必要css',
    },
    schema: [],
    messages: {
      onlyTailwind: 'Do not put actual content inside <style> tags in Vue files.\nPlease use Tailwind CSS only.\nIf necessary, you can add "cosmo-only-tailwind-disable" comment to skip the check for the whole file.\n你已经学了Tailwind了, 不要用css了, 这样显得很混乱',
    },
  },
  create(context) {
    return {
      Program() {
        const filename = context.getFilename();

        if (!filename || !filename.endsWith('.vue')) {
          return;
        }

        const sourceCode = context.sourceCode;
        const text = sourceCode.getText();

        // 文件级别的跳过标记，支持 CSS/JS 注释与 HTML 注释。
        // 示例：
        //   /* cosmo-only-tailwind-disable */
        //   <!-- cosmo-only-tailwind-disable -->
        if (text.includes('cosmo-only-tailwind-disable')) {
          return;
        }

        const styleBlockRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

        while (true) {
          const match = styleBlockRegex.exec(text);

          if (match === null) {
            break;
          }

          const styleContent = match[1];

          // 仅注释与空白内容的 style 块允许通过。
          const contentWithoutComments = styleContent.replace(/\/\*[\s\S]*?\*\//g, '');

          if (contentWithoutComments.trim().length === 0) {
            continue;
          }

          const contentStartIndex = match.index + match[0].indexOf('>') + 1;
          const loc = sourceCode.getLocFromIndex(contentStartIndex);

          context.report({
            loc: {
              start: loc,
              end: loc,
            },
            messageId: 'onlyTailwind',
          });
        }
      },
    };
  },
};

export default {
  rules: {
    'only-tailwind': onlyTailwindRule,
  },
};
