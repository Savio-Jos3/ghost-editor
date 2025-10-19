import { Node, mergeAttributes } from "@tiptap/core";

export const Bookmark = Node.create({
  name: "bookmark",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      url: { default: "" },
      title: { default: "" },
      description: { default: "" },
      image: { default: "" },
      favicon: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "bookmark-block" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "bookmark-block",
      mergeAttributes(HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement("div");
      dom.className = "bookmark-block bg-gray-50 p-4 rounded shadow mb-4 flex gap-4 border hover:border-blue-300 transition-colors";
      
      dom.innerHTML = `
        ${node.attrs.image ? `<img src="${node.attrs.image}" alt="" class="w-32 h-32 object-cover rounded" />` : ''}
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            ${node.attrs.favicon ? `<img src="${node.attrs.favicon}" alt="" class="w-4 h-4" />` : ''}
            <span class="font-bold text-lg">${node.attrs.title}</span>
          </div>
          <div class="text-sm text-gray-600 mb-2">${node.attrs.description}</div>
          <a href="${node.attrs.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-sm">${node.attrs.url}</a>
        </div>
      `;
      
      return { dom };
    };
  },
});
