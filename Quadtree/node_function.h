/*****************************************************************************
 *********************************FUNCTONS************************************
 *****************************************************************************/

/*******Create the all the functions**********/

Node *makeNode( double x, double y, int level);

void makeChildren(Node *parent);

void printOut( FILE *fp, Node *node );

void writeTree(Node *head);

void writeNode(FILE *fp, Node *node);

void destroyNode(Node *node);

void writeLinkedTree(LeafList *leaf, Node *node);

void addNode(LeafList *leaf, Node *node);

void initialiseTheList(LeafList *leaf);

void writeLinkedNode(FILE *fp, LeafList *leaf);

void LinkedList(LeafList *leaf, Node *node);

void growTree(LeafList *leaf);

void generateQuadtree(LeafList *leaf);

/******************************************************************************/
