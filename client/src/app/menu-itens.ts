import { ClientComponent } from "./client/client.component";
import { CollectionComponent } from "./collection/collection.component";
import { GroupComponent } from "./group/group.component";
import { ProductComponent } from "./product/product.component";
import { SubgroupComponent } from "./subgroup/subgroup.component";
import { UserComponent } from "./user/user.component";

export const MenuItens = [
    {
        path: 'group',
        caption : 'Grupo',
        icon : ' category',
        component: GroupComponent,
    },
    {
        path: 'subgroup',
        caption : 'Subgrupo',
        icon : 'group_work',
        component: SubgroupComponent,
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'collections_bookmark',
        component: CollectionComponent,
    },
    {
        path: 'product',
        caption : 'Produto',
        icon : 'style',
        component: ProductComponent,
    },
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'people',
        component: ClientComponent,
    },
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person_pin',
        component: UserComponent,
    }
]