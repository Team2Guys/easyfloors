import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccessoriesService } from './accessories.service';
import { Accessory } from './entities/accessory.entity';
import { CreateAccessoryInput } from './dto/create-accessory.input';
import { UpdateAccessoryInput } from './dto/update-accessory.input';

@Resolver(() => Accessory)
export class AccessoriesResolver {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Mutation(() => Accessory,{name:"add_Accessories"})
  createAccessory(@Args('createAccessoryInput') createAccessoryInput: CreateAccessoryInput) {
    return this.accessoriesService.create(createAccessoryInput);
  }

  @Query(() => [Accessory], { name: 'accessories' })
  findAll() {
    return this.accessoriesService.findAll();
  }

  @Query(() => Accessory, { name: 'accessory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accessoriesService.findOne(id);
  }

  @Mutation(() => Accessory)
  updateAccessory(@Args('updateAccessoryInput') updateAccessoryInput: UpdateAccessoryInput) {
    return this.accessoriesService.update(updateAccessoryInput.id, updateAccessoryInput);
  }

  @Mutation(() => Accessory)
  removeAccessory(@Args('id', { type: () => Int }) id: number) {
    return this.accessoriesService.remove(id);
  }
}
