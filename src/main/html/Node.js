/**
 * @interface
 * @implements EventTarget
 * @see https://www.w3.org/TR/dom/#node
 */
class Node extends EventTarget {
    constructor() {
        super();
        // todo: Symbol for Document
    }

    /**
     * The nodeType attribute must return the type of the node, which must be one of the following:
     * ELEMENT_NODE (1);
     * TEXT_NODE (3);
     * PROCESSING_INSTRUCTION_NODE (7);
     * COMMENT_NODE (8);
     * DOCUMENT_NODE (9);
     * DOCUMENT_TYPE_NODE (10);
     * DOCUMENT_FRAGMENT_NODE (11).
     *
     * @returns {number}
     * @see https://www.w3.org/TR/dom/#dom-node-nodetype
     */
    get nodeType() {
        return 1;
    }

    /**
     * The nodeName attribute must return the following, depending on the context object:
     * @returns {string}
     * @see https://www.w3.org/TR/dom/#dom-node-nodename
     */
    get nodeName() {
        return '';
    }

    /**
     *
     * @returns {string}
     * @see https://www.w3.org/TR/dom/#dom-node-baseuri
     */
    get baseURI() {
        return '';
    }

    /**
     *
     * @returns {Document}
     */
    get ownerDocument() {
        return Document;
    }
    
    // readonly attribute Node? parentNode;
    // readonly attribute Element? parentElement;
    // boolean hasChildNodes();
    // [SameObject] readonly attribute NodeList childNodes;
    // readonly attribute Node? firstChild;
    // readonly attribute Node? lastChild;
    // readonly attribute Node? previousSibling;
    // readonly attribute Node? nextSibling;
    //
    // attribute DOMString? nodeValue;
    // attribute DOMString? textContent;
    // void normalize();
    //
    // [NewObject] Node cloneNode(optional boolean deep = false);
    // boolean isEqualNode(Node? node);
    //
    // const unsigned short DOCUMENT_POSITION_DISCONNECTED = 0x01;
    // const unsigned short DOCUMENT_POSITION_PRECEDING = 0x02;
    // const unsigned short DOCUMENT_POSITION_FOLLOWING = 0x04;
    // const unsigned short DOCUMENT_POSITION_CONTAINS = 0x08;
    // const unsigned short DOCUMENT_POSITION_CONTAINED_BY = 0x10;
    // const unsigned short DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;
    // unsigned short compareDocumentPosition(Node other);
    // boolean contains(Node? other);
    //
    // DOMString? lookupPrefix(DOMString? namespace);
    // DOMString? lookupNamespaceURI(DOMString? prefix);
    // boolean isDefaultNamespace(DOMString? namespace);
    //
    // Node insertBefore(Node node, Node? child);
    // Node appendChild(Node node);
    // Node replaceChild(Node node, Node child);
    // Node removeChild(Node child);
}
/** @see https://www.w3.org/TR/dom/#dom-node-element_node */
Node.ELEMENT_NODE = 1;

Node.ATTRIBUTE_NODE = 2; // historical

/** @see https://www.w3.org/TR/dom/#dom-node-text_node */
Node.TEXT_NODE = 3;

Node.CDATA_SECTION_NODE = 4; // historical

Node.ENTITY_REFERENCE_NODE = 5; // historical

Node.ENTITY_NODE = 6; // historical

/** @see https://www.w3.org/TR/dom/#dom-node-processing_instruction_node */
Node.PROCESSING_INSTRUCTION_NODE = 7;

/** @see https://www.w3.org/TR/dom/#dom-node-comment_node */
Node.COMMENT_NODE = 8;

/** @see https://www.w3.org/TR/dom/#dom-node-document_node */
Node.DOCUMENT_NODE = 9;

/** @see https://www.w3.org/TR/dom/#dom-node-document_type_node */
Node.DOCUMENT_TYPE_NODE = 10;

/** @see https://www.w3.org/TR/dom/#dom-node-document_fragment_node */
Node.DOCUMENT_FRAGMENT_NODE = 11;

Node.NOTATION_NODE = 12; // historical